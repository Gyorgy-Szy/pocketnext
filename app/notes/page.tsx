import Link from "next/link";
import PocketBase from "pocketbase";

async function getNotes() {
  const db = new PocketBase("http://127.0.0.1:8090");
  const data = await db.collection("notes").getFullList();

  // const res = await fetch(
  //   `http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30`,
  //   { cache: "no-store" }
  // );
  // const data = await res.json();

  console.log("getList returned:", data);

  return data as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();
  // console.log("got notes:", notes);
  return (
    <div>
      <h1>NOTES</h1>
      {notes?.map((note) => {
        return <Note key={note?.id} note={note} />;
      })}
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div>
        <h2>Title: {title}</h2>
        <h2>content: {content}</h2>
        <h2>created: {created}</h2>
      </div>
    </Link>
  );
}
