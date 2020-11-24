# My_trello
A project designed based on [Trello](https://trello.com/zh-Hant) for practicing RoR.
The project is originally created by [Eddie Kao](https://github.com/kaochenlong/my-tello)

Logo 版權屬 Trello 所有
## Prerequisites
The setups steps expect following tools installed on the system.

- Git
- Ruby 2.6.3
- Rails 6.0.3
- Yarn
- NodeJs
- Postgresql

## Packages / Toos
* [devise](https://github.com/heartcombo/devise): Framework for authentication and easily generating member system
* [tailwindcss](https://tailwindcss.com/): CSS framework
* [webpacker](https://github.com/rails/webpacker): Asssets bundler
* [VueJS](https://vuejs.org/): JavaScript Framework
* [foreman](https://github.com/theforeman/foreman): Quickly deploy  application by defining processes and jobs in `Procfile`
* [yarn](https://github.com/yarnpkg/yarn): Package manager for JS
*  [acts_as_list](https://github.com/brendon/acts_as_list): Sort and reorder model objects like list
*  [rspec-rails](https://github.com/rspec/rspec-rails): Testing library
*  [faker](https://github.com/faker-ruby/faker): Library for generating fake data
## Installation

### 1. Clone the repository

```bash
git clone git@github.com:balababa/my_citiesocial.git
```
### 2. Create application.yml file

```bash
cp config/application.yml.sample config/application.yml
```
> set the environment variables needed in application.yml.
### 3. Install gems

```ruby
bundle install
```

### 4. Create and setup the database

Run the following commands to create and setup the database.

```ruby
bin/rails db:create
bin/rails db:migrate
```
> You may need to set up database configuration in `config/database.yml`

### 5. Start the Rails server

```ruby
bin/rails s
```
You also need to start webpack-dev-server in a separate terminal to watch for changes in `app/javascript/packs/*.js` and compile it immediately.
```ruby
bin/webpack-dev-server
```


---

Or you can start all processes and jobs needed to run by
```ruby
foreman start 
```
> The processes are defined in `~/Procfile`
