import { Entity, Fields, Validators } from "remult";

@Entity("tasks", {
  allowApiCrud: true,
})
export class Task {
  @Fields.autoIncrement()
  id = 0;
  @Fields.string({
    validate: Validators.required
  })
  title = "";
  @Fields.boolean()
  completed = false;
}
