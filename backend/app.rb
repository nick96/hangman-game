# frozen_string_literal: true

require 'sequel'
require 'sinatra'
require 'sinatra/cors'
require 'securerandom'
require 'json'

db_url = ENV['DB_URL'] || 'postgres://test:test@localhost:5432/hangmandb'
DB = Sequel.connect db_url

DB.create_table? :games do
  primary_key :id
  # Name of the game. This is a unique string that is part of the URL.
  String :name
  # Word the player is trying to guess
  String :word
  # Letters the player has guessed, '_' indicates those that have not been
  # guessed.
  String :guessed
  # Letters the player has selected
  String :selected
  # Number of lives the player has left
  Integer :lives
end

games = DB[:games]

enable :logging

set :allow_origin, '*'
set :allow_methods, 'GET,POST, PUT'
set :allow_headers, 'content-type,if-modified-since'
set :expose_headers, 'location,link'

before do
  content_type 'application/json'
end

# Request the creation of a new game.
post '/game' do
  name = SecureRandom.hex 6
  new_game = games.returning(:name, :word, :guessed, :selected, :lives).insert(
    name: name,
    word: '',
    guessed: '',
    selected: '',
    lives: 6
  )
  status 201
  new_game.to_json
end

# Get the status of game by `name`.
get '/game/:name' do |name|
  game = games.select(:name, :word, :guessed, :selected, :lives).where(name: name).first
  if game.nil?
    status 404
    return
  end
  game.to_json
end

# Update game by `name`.
put '/game/:name' do |name|
  game = games.where(name: name).first
  if game.nil?
    status 404
    return
  end

  request.body.rewind
  data = JSON.parse request.body.read, symbolize_names: true
  expected_keys = %i[name word guessed selected lives]
  if data.keys.sort != expected_keys.sort
    status 400
    msg = {
      error: 'Validation error',
      message: "Expected keys #{expected_keys}, found #{data.keys}"
    }
    return msg.to_json
  end

  games.where(name: name).update(name: data[:name],
                                 word: data[:word],
                                 guessed: data[:guessed],
                                 selected: data[:selected],
                                 lives: data[:lives])
  games.where(name: name).first.to_json
end
