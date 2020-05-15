Rails.application.routes.draw do
  resources :cards do
    member do
      put :move
    end
  end
  
  resources :lists do
    member do
      put :move
    end
  end


  devise_for :users
  root 'lists#index'

 
end
