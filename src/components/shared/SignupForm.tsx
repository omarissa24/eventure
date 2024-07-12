// app/components/SignUpForm.tsx
import Link from "next/link";

interface SignUpFormProps {
  signUpWithEmail: ({
    emailAddress,
    password,
    firstName,
    lastName,
    role,
  }: {
    emailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => void;
  clerkError: string;
}

const SignupForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {
  return (
    <div className='justify-center mt-12 grid justify-items-center md:mt-20'>
      <div className='h-auto rounded-xl md:rounded-3xl w-80 md:w-96'>
        <div className='p-6 md:p-8'>
          <h1 className='mb-6 text-3xl font-light text-black'>Sign Up</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                email: { value: string };
                password: { value: string };
                firstName: { value: string };
                lastName: { value: string };
                role: { value: string };
              };
              const email = target.email.value;
              const password = target.password.value;
              signUpWithEmail({
                emailAddress: email,
                password: password,
                firstName: target.firstName.value,
                lastName: target.lastName.value,
                role: target.role.value,
              });
            }}
          >
            <div className='flex justify-between'>
              <label className='text-sm font-light text-black'>
                Organizer
                <input
                  name='role'
                  type='radio'
                  value='organizer'
                  className='ml-2'
                  required
                />
              </label>
              <label className='text-sm font-light text-black'>
                Customer
                <input
                  name='role'
                  type='radio'
                  value='customer'
                  className='ml-2'
                  required
                />
              </label>
            </div>
            <input
              name='firstName'
              className='block w-full pb-4 pl-4 mb-3 text-sm font-light bg-transparent border-0 border-b-2 h-37 border-slate-600 text-white caret-slate-700 focus:border-white'
              placeholder='First name'
              type='text'
              required
            />

            <input
              name='lastName'
              className='block w-full pb-4 pl-4 mb-3 text-sm font-light bg-transparent border-0 border-b-2 h-37 border-slate-600 text-white caret-slate-700 focus:border-white'
              placeholder='Last name'
              type='text'
              required
            />

            <input
              name='email'
              className='block w-full pb-4 pl-4 mb-3 text-sm font-light bg-transparent border-0 border-b-2 h-37 border-slate-600 text-white caret-slate-700 focus:border-white'
              placeholder='Email address'
              type='email'
              required
            />
            <input
              name='password'
              className='block w-full pb-4 pl-4 mb-3 text-sm font-light bg-transparent border-0 border-b-2 h-37 border-slate-600 text-black caret-slate-700 focus:border-white'
              placeholder='Password'
              type='password'
              required
            />
            <h2 className='text-red mb-8'>
              {clerkError && <p>{clerkError}</p>}
            </h2>
            <button
              className='w-full h-12 mb-6 text-sm font-light text-white hover:text-blue-900 hover:bg-white bg-slate-700 rounded-md'
              type='submit'
            >
              Create an account
            </button>
          </form>
          <p className='text-sm font-light text-center text-black'>
            Already have an acccount?
            <Link className='ml-2 text-black-200' href='/sign-in'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
