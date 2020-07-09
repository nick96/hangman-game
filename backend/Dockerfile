FROM ruby:2.6.3

WORKDIR /app

COPY Gemfile Gemfile.lock .

RUN bundle install --deployment

COPY config.ru ./

COPY app.rb ./

CMD ["bundle", "exec", "rackup"]