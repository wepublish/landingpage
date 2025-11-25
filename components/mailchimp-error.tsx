interface MailchimpErrorProps {
  message: string;
}

function MailchimpError({ message }: MailchimpErrorProps) {
  return (
    <div className="mailchimp-error">
      {message}
    </div>
  );
}

export default MailchimpError;
