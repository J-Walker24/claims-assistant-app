import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  return new Response("Process Supervisor Report Function Running", {
    headers: { "Content-Type": "text/plain" },
  });
});


