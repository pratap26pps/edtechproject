import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { coursecontent } = useSelector((state) => state.course);
  const [courseDetail, setCourseDetail] = useState(null);

  useEffect(() => {
    const foundCourse = coursecontent?.find((c) => c._id === courseId);
    if (foundCourse) {
      setCourseDetail(foundCourse);
    }
  }, [coursecontent, courseId]);

  if (!courseDetail) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p className="text-lg animate-pulse">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      {/* Course Header */}
      <div className="mb-8 bg-gradient-to-r from-indigo-800 to-purple-700 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold mb-2">{courseDetail.name}</h1>
        <p className="text-sm text-gray-200 mb-4">{courseDetail.description}</p>
        <p className="text-base font-semibold text-yellow-300">
          What you'll learn:
        </p>
        <p className="text-gray-100">{courseDetail.whatwillLearn}</p>
      </div>

      {/* Course Sections */}
      <div className="space-y-6">
        {courseDetail.coursecontent.map((section) => (
          <div
            key={section._id}
            className="bg-gray-800 border border-gray-600 rounded-lg p-5 shadow-md"
          >
            <h2 className="text-xl font-bold mb-4 text-cyan-300">
              {section.sectionName}
            </h2>

            {/* Subsections */}
            {section.subSection.length === 0 ? (
              <p className="text-gray-400 italic">No subsections available.</p>
            ) : (
              section.subSection.map((sub) => (
                <div
                  key={sub._id}
                  className="mb-6 bg-gray-900 p-4 rounded-md shadow-sm"
                >
                  <p className="text-lg font-semibold text-white mb-1">
                    {sub.title}
                  </p>
                  <p className="text-sm text-gray-300 mb-3">
                    {sub.description}
                  </p>
                  <video
                    controls
                    src={sub.videoUrl}
                    className="w-96 h-96 ml-72 rounded-md border border-gray-700"
                  />
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
