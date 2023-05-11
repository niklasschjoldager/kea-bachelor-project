import Image from "next/image";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  let data;

  try {
    data = await getData();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      {data ? (
        <>
          <h1 className="text-4xl">{data.title}</h1>
          <p className="text-base">{data.description}</p>
        </>
      ) : (
        "loading data from FastAPI..."
      )}
    </main>
  );
}
