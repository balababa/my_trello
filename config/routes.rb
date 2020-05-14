Rails.application.routes.draw do
  resources :cards
  
  resources :lists do
    member do
      put :move
    end
  end


  devise_for :users
  root 'lists#index'

 
end
