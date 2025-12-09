interface MailchimpErrorProps {
  message: string;
}

function MailchimpError({ message }: MailchimpErrorProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-sm text-red-800">
        {message}
      </p>
    </div>
  );
}

export default MailchimpError;
