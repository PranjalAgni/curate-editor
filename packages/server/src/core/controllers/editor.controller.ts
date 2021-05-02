import { Get, JsonController } from "routing-controllers";
import { EditorStateResponse } from "../../types/editor";
import EditorService from "../services/editor.service";
import Container from "typedi";

@JsonController("/editor")
class EditorController {
  @Get("/state")
  getState(): EditorStateResponse {
    const editorService = Container.get(EditorService);
    return {
      status: 200,
      state: editorService.getState()
    };
  }
}

export default EditorController;
