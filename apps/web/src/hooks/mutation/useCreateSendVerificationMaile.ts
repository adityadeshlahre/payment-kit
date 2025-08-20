import axiosInstance from "@/lib/api";
import type { emailReponseInterface, emailSchemaType } from "@repo/types";
import { useMutation } from "@tanstack/react-query";

const useCreateSendVerificationMail = () => {
  const handleSendVerificationMail = async (
    emailSchema: emailSchemaType,
  ): Promise<emailReponseInterface> => {
    const response = await axiosInstance.post("/api/email/send", {
      email: emailSchema.email,
      fromName: emailSchema.fromName,
      fromMail: emailSchema.fromMail,
      subject: emailSchema.subject,
      typeOfEMail: emailSchema.typeOfEMail,
      url: emailSchema.url,
    });

    return response.data;
  };

  const handleSuccess = (data: emailReponseInterface) => {
    return data;
  };

  const handleError = (error: any) => {
    console.error("Error sending verification email:", error);
    throw error;
  };

  const mutation = useMutation({
    mutationFn: handleSendVerificationMail,
    onSuccess: handleSuccess,
    onError: handleError,
    mutationKey: ["sendVerificationMail"],
  });
  return mutation;
};

export default useCreateSendVerificationMail;
