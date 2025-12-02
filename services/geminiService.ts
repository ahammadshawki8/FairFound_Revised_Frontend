
import { GoogleGenAI, Type } from "@google/genai";
import { FreelancerProfile, AnalysisData, RoadmapStep, PortfolioContent, Task } from "../types";

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeProfileWithGemini = async (profile: FreelancerProfile): Promise<AnalysisData> => {
  if (!API_KEY) {
    // Fallback mock data if no key is present in dev environment
    console.warn("No API Key found, returning mock analysis.");
    return {
      globalReadinessScore: 78,
      marketPercentile: 65,
      projectedEarnings: 85000,
      strengths: ["Strong React fundamentals", "Good communication style"],
      weaknesses: ["Lack of backend knowledge", "Portfolio is generic"],
      opportunities: ["High demand for Fullstack", "SaaS niche"],
      threats: ["AI code generation saturation"],
      skillGaps: ["Next.js", "PostgreSQL", "System Design"],
      pricingSuggestion: {
        current: profile.hourlyRate,
        recommended: profile.hourlyRate * 1.25,
        reasoning: "Your skill set is in high demand, but your packaging needs work."
      },
      metrics: {
        portfolioScore: 60,
        githubScore: 75,
        communicationScore: 85,
        techStackScore: 80
      }
    };
  }

  try {
    const prompt = `
      Analyze this freelancer profile for the current global market.
      Profile: ${JSON.stringify(profile)}
      
      Provide a detailed SWOT analysis, scoring, and pricing recommendations.
      Be critical but constructive.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            globalReadinessScore: { type: Type.NUMBER },
            marketPercentile: { type: Type.NUMBER },
            projectedEarnings: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
            threats: { type: Type.ARRAY, items: { type: Type.STRING } },
            skillGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
            pricingSuggestion: {
              type: Type.OBJECT,
              properties: {
                current: { type: Type.NUMBER },
                recommended: { type: Type.NUMBER },
                reasoning: { type: Type.STRING }
              }
            },
            metrics: {
              type: Type.OBJECT,
              properties: {
                portfolioScore: { type: Type.NUMBER },
                githubScore: { type: Type.NUMBER },
                communicationScore: { type: Type.NUMBER },
                techStackScore: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisData;
    }
    throw new Error("No text response from Gemini");

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};

export const generateRoadmapWithGemini = async (profile: FreelancerProfile, gaps: string[]): Promise<RoadmapStep[]> => {
  if (!API_KEY) {
    return [];
  }

  try {
    const prompt = `
      Create a step-by-step 4-week roadmap for this freelancer to improve their market standing.
      Focus on filling these gaps: ${gaps.join(', ')}.
      Profile: ${JSON.stringify(profile)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              duration: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['pending'] },
              type: { type: Type.STRING, enum: ['skill', 'project', 'branding'] }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RoadmapStep[];
    }
    return [];
  } catch (error) {
    console.error("Gemini Roadmap Failed:", error);
    return [];
  }
};

export const generateProposalWithGemini = async (profile: FreelancerProfile, jobDescription: string, tone: string, clientName: string): Promise<string> => {
  if (!API_KEY) {
    return `Dear ${clientName || 'Hiring Manager'},\n\nThis is a mock proposal because no API key was provided. I am writing to express my interest in your project.\n\nBest,\n${profile.name}`;
  }

  try {
    const prompt = `
      Write a compelling freelance proposal/cover letter for this job.
      
      My Profile: ${JSON.stringify(profile)}
      Client Name: ${clientName || "Hiring Manager"}
      
      Job Description:
      ${jobDescription}
      
      Tone: ${tone}
      
      Rules:
      1. Be concise.
      2. Highlight relevant skills from my profile.
      3. Propose a next step.
      4. Do not use placeholders like [Your Name], fill them with profile data.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Could not generate proposal.";
  } catch (error) {
    console.error("Gemini Proposal Failed:", error);
    return "Error generating proposal. Please try again.";
  }
};

export const enhancePortfolioWithGemini = async (profile: FreelancerProfile): Promise<PortfolioContent> => {
    if (!API_KEY) {
        return {
            tagline: "Building digital experiences that matter.",
            about: "I am a passionate developer focusing on creating intuitive and performant web applications.",
            projects: [
                { title: "E-commerce Dashboard", description: "A high-performance analytics dashboard using React and D3.", tags: ["React", "D3", "Node"] },
                { title: "Social API", description: "Scalable backend architecture for a social network.", tags: ["PostgreSQL", "Redis", "Go"] }
            ]
        };
    }

    try {
        const prompt = `
          Generate content for a professional portfolio website for this freelancer.
          Create a catchy tagline, a professional 'about' section (SEO optimized), and 3 sample projects that would fit their skill set if they don't have detailed ones, or enhance their existing skills into project descriptions.
          
          Profile: ${JSON.stringify(profile)}
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tagline: { type: Type.STRING },
                        about: { type: Type.STRING },
                        projects: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    tags: { type: Type.ARRAY, items: { type: Type.STRING }}
                                }
                            }
                        }
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as PortfolioContent;
        }
        throw new Error("No response");
    } catch (error) {
        console.error("Gemini Portfolio Failed:", error);
        throw error;
    }
};

// Mentor Co-Pilot Features

export const generateMenteeTasks = async (menteeName: string, focusArea: string, difficulty: string): Promise<Task[]> => {
    if (!API_KEY) {
        // Mock Tasks
        return [
            { id: '1', title: `Complete ${focusArea} Tutorial`, description: "Go through the official documentation and build a small example.", dueDate: "2023-11-01", status: 'pending' },
            { id: '2', title: "Code Review Prep", description: "Refactor your recent project to clean up the component structure.", dueDate: "2023-11-03", status: 'pending' }
        ];
    }

    try {
        const prompt = `
          Create 3 actionable learning tasks for a mentee named ${menteeName}.
          Focus Area: ${focusArea}
          Difficulty Level: ${difficulty}
          
          Return as JSON array of tasks.
        `;

         const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            dueDate: { type: Type.STRING },
                            status: { type: Type.STRING, enum: ['pending'] }
                        }
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as Task[];
        }
        return [];
    } catch (error) {
        console.error("Gemini Task Gen Failed:", error);
        return [];
    }
}

export const generateMentorFeedback = async (submissionText: string, taskTitle: string): Promise<string> => {
    if (!API_KEY) return "Great job! Your code is clean, but consider handling edge cases.";

    try {
         const prompt = `
          Act as a senior software engineer mentor.
          Provide constructive feedback on this mentee submission for the task: "${taskTitle}".
          Submission/Notes: "${submissionText}"
          
          Keep it encouraging but technical.
        `;
         const response = await ai.models.generateContent({
             model: "gemini-2.5-flash",
             contents: prompt,
         });
         return response.text || "Good work.";
    } catch (e) {
        return "Good effort on this task.";
    }
}
