import InputField from "./components/common/input/input";

export default function Home() {
  return (
    <div>
      <h1>Hola mundo desde home page</h1>
      <InputField label="Email" type="email" name="email" value="" placeholder="Email"/>
    </div>
  );
}
