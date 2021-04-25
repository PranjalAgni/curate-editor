import debug from "debug";
import { Service } from "typedi";

@Service()
class EditorService {
  private debugLog = debug("ces:editor-service");

  getState(): string[] {
    return ["This", "is", "state"];
  }
}

export default EditorService;
