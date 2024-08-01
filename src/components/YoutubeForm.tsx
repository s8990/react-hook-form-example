import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormValues {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string,
    facebook: string,
  };
}

export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
        username: "john doe",
        email: "",
        channel: "",
        social: {
            twitter: "",
            facebook: "",
        },
    },
    // get data from API
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();

    //   return {
    //     username: data.username,
    //     email: data.email,
    //     channel: data.name,
    //   };
    // },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: FormValues) => {
    console.log("form submitted :: ", values);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "username is required",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "email is required",
              validate: {
                notAdmin: (field) => {
                  return field !== "test@mail.com" || "enter another email";
                },
                notBlockListed: (field) => {
                  return (
                    !field.endsWith("example-domain.com") ||
                    "unacceptable email!"
                  );
                },
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "invalid format",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "channel name is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook")}
          />
        </div>

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
