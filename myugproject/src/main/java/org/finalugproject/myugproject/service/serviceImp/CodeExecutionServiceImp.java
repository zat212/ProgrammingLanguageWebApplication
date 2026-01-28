package org.finalugproject.myugproject.service.serviceImp;

import org.finalugproject.myugproject.service.CodeExecutionService;
import org.springframework.stereotype.Service;


import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.TimeUnit;


@Service
public class CodeExecutionServiceImp implements CodeExecutionService {

    private static final String CLASS_NAME = "KaiZenGame";
    private static final int TIME_LIMIT_SECONDS = 3;


    @Override
    public boolean executeAndTest(String userCode, String desiredOutput) {
        File sourceFile = new File(CLASS_NAME + ".java");
        Process process = null;
        boolean result = false;

        try (BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(new FileOutputStream(sourceFile), StandardCharsets.UTF_8))) {
            writer.write(userCode);
            writer.flush();
            JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
            if (compiler == null) {
                System.err.println("JDK required! JRE is insufficient.");
                return false;
            }
            int compilationResult = compiler.run(null, null, null, sourceFile.getPath());
            if (compilationResult != 0) {
                return false;
            }
            process = Runtime.getRuntime().exec("java " + CLASS_NAME);
            if (!process.waitFor(TIME_LIMIT_SECONDS, TimeUnit.SECONDS)) {
                process.destroyForcibly();
                return false;
            }
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                StringBuilder actualOutputBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    actualOutputBuilder.append(line).append("\n");
                }
                String actualOutput = actualOutputBuilder.toString().trim();
                if (actualOutput.endsWith("\n")) {
                    actualOutput = actualOutput.substring(0, actualOutput.length() - 1);
                }

                result = desiredOutput.equals(actualOutput);
            }

        } catch (Exception e) {
            e.printStackTrace();
            result = false;
        } finally {
            new File(CLASS_NAME + ".java").delete();
            new File(CLASS_NAME + ".class").delete();
            if (process != null) {
                process.destroy();
            }
        }
        return result;
    }


    public boolean executeAndTestPython(String submittedCode, String desiredOutput) {
        try {
            File tempFile = File.createTempFile("user_code", ".py");
            try (FileWriter writer = new FileWriter(tempFile)) {
                writer.write(submittedCode);
            }

            ProcessBuilder pb = new ProcessBuilder("python3", tempFile.getAbsolutePath());
            pb.redirectErrorStream(true);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line.trim()).append("\n");
            }

            process.waitFor();
            tempFile.delete();

            String actualOutput = output.toString().trim();

            System.out.println("Expected: " + desiredOutput);
            System.out.println("Got: " + actualOutput);

            return desiredOutput.trim().equals(actualOutput);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean executeAndTestPython1(String submittedCode, String desiredOutput) {
        try {
            if (!submittedCode.contains("main()")) {
                submittedCode += "\n\nif __name__ == '__main__':\n    main()";
            }
            Path tempFile = Files.createTempFile("python_code", ".py");
            Files.writeString(tempFile, submittedCode);

            ProcessBuilder pb = new ProcessBuilder("python3", tempFile.toAbsolutePath().toString());
            pb.redirectErrorStream(true);
            Process process = pb.start();

            String actualOutput = new String(process.getInputStream().readAllBytes()).trim();
            process.waitFor();

            System.out.println("Expected: [" + desiredOutput + "]");
            System.out.println("Actual:   [" + actualOutput + "]");

            return actualOutput.strip().equals(desiredOutput.strip());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean executeAndTestJavaScript(String jsCode, String desiredOutput) {
        System.out.println("Input JS Code:\n" + jsCode);
        System.out.println("Expected Output:\n" + desiredOutput);

        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("nashorn");

        if (engine == null) {
            System.err.println("❌ JavaScript engine not found (Nashorn may be removed in your JDK).");
            return false;
        }
        StringWriter outputWriter = new StringWriter();
        engine.getContext().setWriter(new PrintWriter(outputWriter));
        engine.getContext().setErrorWriter(new PrintWriter(outputWriter));

        try {
            engine.eval("var console = { log: function(msg) { print(msg); } };");

            engine.eval(jsCode);
        } catch (ScriptException e) {
            e.printStackTrace();
            return false;
        }

        String output = outputWriter.toString().trim();
        System.out.println("Captured JS output: [" + output + "]");

        return output.equals(desiredOutput.trim());
    }

}



