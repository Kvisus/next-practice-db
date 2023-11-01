import Image from "next/image";
import { GetServerSideProps } from "next";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Link href="./dbPage" className="bg-red-950 hover:bg-zinc-700">
        Send q to db
      </Link>
    </div>
  );
}
