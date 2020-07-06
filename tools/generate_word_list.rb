require 'json'
require 'net/http'
require 'uri'

URL = 'https://www.mit.edu/~ecprice/wordlist.10000'

def main
  uri = URI(URL)
  resp = Net::HTTP.get_response(uri.host, uri.path)
  if resp.code != "200"
    STDERR.puts "Failed to get word list from #{URL}"
    STDERR.puts "Status: #{resp.code.class}"
    exit 1
  end

  words = {}
  resp.body.each_line do |line|
    words[line.chomp] = line.length
  end
  puts words.to_json
end

if __FILE__ == $0
  main
end
