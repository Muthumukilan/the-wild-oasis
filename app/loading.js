import Spinner from "./_components/Spinner";

export default function Page() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading ... </p>
    </div>
  );
}
