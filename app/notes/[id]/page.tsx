import PocketBase from "pocketbase";

async function getNote(noteId: string) {
  const db = new PocketBase("http://127.0.0.1:8090");
  const data = await db
    .collection("notes")
    .getOne(noteId, { cache: "no-cache" });

  console.log("getOne returned:", data);

  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params?.id);
  return (
    <div>
      <h1>Note {params?.id}</h1>
      <h2>Title: {note?.title}</h2>
      <h2>content: {note?.content}</h2>
      <h2>created: {note?.created}</h2>
    </div>
  );
}
