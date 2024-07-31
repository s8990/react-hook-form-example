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

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
