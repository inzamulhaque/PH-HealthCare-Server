import { z } from "zod";

const createSpecialtiesValidtaion = z.object({
  title: z.string({
    required_error: "Title is required!",
  }),
});

export { createSpecialtiesValidtaion };
