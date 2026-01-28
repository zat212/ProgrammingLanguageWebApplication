package org.finalugproject.myugproject.service;

import java.util.Map;

public interface CodeExecutionService {

    boolean executeAndTest(String userCode, String desiredOutput);

    boolean executeAndTestPython(String userCode, String desiredOutput);


    boolean executeAndTestPython1(String submittedCode, String desiredOutput);

    boolean executeAndTestJavaScript(String jsCode, String desiredOutput);

}
