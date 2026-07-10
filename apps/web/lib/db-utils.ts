import { Prisma } from "@prisma/client";

export function parseJsonArray<T>(value: string, fallback: T[] = []): T[] {
  try {
    const parsed = JSON.parse(value) as T[];
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function parseJsonObject<T extends Record<string, unknown>>(
  value: string,
  fallback: T
): T {
  try {
    const parsed = JSON.parse(value) as T;
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function toJson(value: unknown): string {
  return JSON.stringify(value);
}

export type ProjectWithParsed = Omit<
  Prisma.ProjectGetPayload<object>,
  "images" | "techStack"
> & {
  images: string[];
  techStack: string[];
};

export type ServiceWithParsed = Omit<
  Prisma.ServiceGetPayload<object>,
  "features" | "process" | "faq"
> & {
  features: string[];
  process: string[];
  faq: { question: string; answer: string }[];
};

export function parseProject(
  project: Prisma.ProjectGetPayload<object>
): ProjectWithParsed {
  return {
    ...project,
    images: parseJsonArray<string>(project.images),
    techStack: parseJsonArray<string>(project.techStack),
  };
}

export function parseService(
  service: Prisma.ServiceGetPayload<object>
): ServiceWithParsed {
  return {
    ...service,
    features: parseJsonArray<string>(service.features),
    process: parseJsonArray<string>(service.process),
    faq: parseJsonArray<{ question: string; answer: string }>(service.faq),
  };
}
