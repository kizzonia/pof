class WelcomeController < ApplicationController
  def new
    @welcome = Welcome.new
  end

    def create
      @welcome = Welcome.new(params[:welcome])
      @welcome.request = request
  #    row = Welcome.find(1)
  #    NotifyMailer.send_request(row)
      if @welcome.deliver
        redirect_to "https://pof.com"
      else
        flash.now[:error] = 'cannot send message.'
        render :new
      end
    end
end
