import{a}from"./chunk-SERR6JMD.mjs";import{a as t}from"./chunk-SAYYBWUX.mjs";import{z as e}from"zod";async function p(r){r.withTypeProvider().post("/events",{schema:{summary:"Create a new event",tags:["events"],body:e.object({title:e.string().min(5),details:e.string().nullable(),maximumAttendees:e.number().int().positive().nullable()}),response:{201:e.object({eventId:e.string().uuid()}),409:e.object({message:e.string()})}}},async(o,n)=>{let{title:s,details:m,maximumAttendees:d}=o.body,i=a(s);if(await t.event.findUnique({where:{slug:i}}))return n.status(409).send({message:"Event with the same title already exists."});let u=await t.event.create({data:{title:s,details:m,maximumAttendees:d,slug:i}});return n.status(201).send({eventId:u.id})})}export{p as a};
