import { trpc } from "../utils/trpc";

export default function Home() {
  const res = trpc.sayHi.useQuery();

  console.log(res.data);

  return <div>Home</div>;
}
