class WelcomeController < ApplicationController
  def new
    @welcome = Welcome.new
  end

    def create
      @welcome = Welcome.new(params[:welcome])
      @welcome.request = request
<<<<<<< HEAD
=======
  #    row = Welcome.find(1)
  #    NotifyMailer.send_request(row)
>>>>>>> 69f6ee56d19a02c1f0da93fd3735819728cf7ea2
      if @welcome.deliver
        redirect_to "https://pof.com"
      else
        flash.now[:error] = 'cannot send message.'
        render :new
      end
    end
end
