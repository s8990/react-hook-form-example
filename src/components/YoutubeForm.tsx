import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

interface FormValues {
  username: string;
  email: string;
  channel: string;
  age: number;
  dob: Date;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: {
    number: string;
  }[];
}

export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    mode: "onTouched", // onBlur, onChange, onSubmit, all
    defaultValues: {
      username: "john doe",
      email: "",
      channel: "",
      age: 0,
      dob: new Date(),
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: [
        {
          number: "",
        },
      ],
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
    reset,
    formState: {
      errors,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
      touchedFields,
      dirtyFields,
    },
    watch,
    getValues,
    setValue,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "phoneNumbers",
    control: control,
  });

  console.log("touchedFields :: ", touchedFields);
  console.log("dirtyFields :: ", dirtyFields);
  console.log("isDirty :: ", isDirty);

  //   const watchFields = watch(["username", "email"]);
  // const watchFields = watch();

  // console.log("re-render")

  // useEffect(()=>{
  //     const subscription = watch((value)=> {
  //         console.log("value :: ", value)
  //     });

  //     return () => subscription.unsubscribe();
  // },[watch]);

  console.log("isSubmitting :: ", isSubmitting);
  console.log("isSubmitted :: ", isSubmitted);
  console.log("isSubmitSuccessful :: ", isSubmitSuccessful);
  console.log("submitCount :: ", submitCount);

  const handleResetValues = () => {
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      // TODO : read more about reset method in docs
      reset();
    }
  }, [isSubmitSuccessful]);

  const handleGetValues = () => {
    console.log("getValues :: ", getValues());
    console.log("getValues - username :: ", getValues("username"));
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onErrorHandler = (errors: FieldErrors<FormValues>) => {
    console.log("errors :: ", errors);
  };

  const onSubmit = (values: FormValues) => {
    console.log("form submitted :: ", values);
  };

  return (
    <div>
      <h1>YouTube Form</h1>
      {/* <h2>{JSON.stringify(watchFields)}</h2> */}

      <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "username is required",
              //   disabled: true,
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
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "email is exist";
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
          <label htmlFor="age">age</label>
          <input
            type="text"
            id="age"
            {...register("age", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="dob">dob</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label>Phone Numbers List</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="form-control">
                  <input
                    type="text"
                    {...register(`phoneNumbers.${index}.number`)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => {
                append({
                  number: "",
                });
              }}
            >
              Add
            </button>
          </div>
        </div>

        <button disabled={!isDirty || !isValid}>Submit</button>
        <button type="button" onClick={handleResetValues}>
          reset values
        </button>
        <button type="button" onClick={handleGetValues}>
          get values
        </button>
        <button type="button" onClick={handleSetValue}>
          set value
        </button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
