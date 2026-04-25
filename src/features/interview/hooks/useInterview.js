import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    status,
    setStatus,
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null;

    try {
      setStatus("Uploading your data...");

      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setStatus("Generating AI interview plan...");

      setReport(response.interviewReport);

      setStatus("Finalizing your strategy...");

      return response.interviewReport;
    } catch (error) {
      console.log(error);
      setStatus("Something went wrong ❌");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };

  const getReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    try {
      const blob = await generateResumePdf({ interviewReportId });

      // ✅ Verify blob is valid before downloading
      console.log("Blob size:", blob.size, "Blob type:", blob.type);

      if (blob.size < 1000) {
        console.error("PDF blob too small, likely corrupted!");
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${interviewReportId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // ✅ cleanup properly
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
