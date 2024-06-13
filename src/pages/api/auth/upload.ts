import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  let userId:string = "";
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user !== null) {
      userId = user.id;
    }
    else {
      userId = "";
    }
  }
  catch (error) {}


  const formData = await request.formData();
  const file = formData.get("file") as File;

  
  const { data, error } = await supabase
  .storage
  .from('files')
  .upload(userId + "/" + uuidv4(), file, {
    cacheControl: '3600',
    upsert: false
  })

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/dashboard");
};