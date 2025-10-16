import * as v from "valibot";

export const valibotSchema = v.object({
  name: v.pipe(v.string(), v.minLength(5)),
  age: v.pipe(v.string(), v.minLength(5)),
});
