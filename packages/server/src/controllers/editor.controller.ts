import { Get, JsonController, Req, Res } from "routing-controllers";
import { EditorState } from "../interfaces/editor";
import EditorService from "../services/editor.service";
import Container from "typedi";

@JsonController("/editor")
class EditorController {
  @Get("/state")
  getState(): EditorState & { status: number } {
    const editorService = Container.get(EditorService);
    return {
      status: 200,
      state: editorService.getState()
    };
  }
}

export default EditorController;
