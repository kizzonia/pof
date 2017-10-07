class WelcomeController < ApplicationController
  def index
    @welcome = Welcome.new
  end

    def create
      @welcome = Welcome.new(params[:welcome])
      @welcome.request = request
      if @welcome.deliver
        flash.now[:error] = nil
      else
        flash.now[:error] = 'cannot send message.'
        render :index
      end
    end
end
