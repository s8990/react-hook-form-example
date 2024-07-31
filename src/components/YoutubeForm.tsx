import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormValues {
  username: string;
  email: string;
  channel: string;
}

export const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "username is required",
          })}
        />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email", {
            required: "email is required",
            pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "invalid format",
            },
        })} />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: "channel name is required",
          })}
        />

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
