import type { Content, JourneyStop } from "./content";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function hasStrings(value: JsonObject, fields: string[]): boolean {
  return fields.every((field) => isString(value[field]));
}

function isList(value: unknown, validate: (item: unknown) => boolean): boolean {
  return Array.isArray(value) && value.every(validate);
}

function isProject(value: unknown): boolean {
  return isObject(value) &&
    hasStrings(value, ["id", "name", "what", "problem", "role", "stack", "decisions", "impact", "links"]) &&
    isList(value.highlights, isString) &&
    (value.status === "live" || value.status === "code-complete" || value.status === "archived") &&
    (value.origin === "freelance" || value.origin === "personal") &&
    (value.image === undefined || isString(value.image));
}

function isSkill(value: unknown): boolean {
  return isObject(value) &&
    hasStrings(value, ["category", "stack", "story"]) &&
    (value.depth === "Production-ready" || value.depth === "Comfortable" || value.depth === "Learning") &&
    (value.id === undefined || isString(value.id)) &&
    (value.proofLink === undefined ||
      (isObject(value.proofLink) && hasStrings(value.proofLink, ["label", "href"])));
}

function isExperience(value: unknown): boolean {
  return isObject(value) &&
    hasStrings(value, ["id", "org", "role", "period"]) &&
    isList(value.bullets, isString) &&
    (value.images === undefined || isList(value.images, isString));
}

function isJourneyStop(value: unknown): boolean {
  return isObject(value) &&
    hasStrings(value, ["id", "title", "description"]) &&
    (value.period === undefined || isString(value.period));
}

export function parseContent(value: unknown, legacyJourney?: JourneyStop[]): Content | null {
  if (!isObject(value)) return null;
  const { positioning, hero, contact, personal } = value;
  if (!isObject(positioning) || !hasStrings(positioning, ["targetRoles", "oneLiner"]) ||
      !isObject(hero) || !hasStrings(hero, ["name", "preferredName", "title", "subheadline", "ctaLabel", "ctaHref", "badge"]) ||
      !isList(hero.poweredBy, isString) || (hero.photo !== undefined && !isString(hero.photo)) ||
      !isObject(contact) || !hasStrings(contact, ["email", "linkedin", "github"]) ||
      !isObject(personal) || !hasStrings(personal, ["originStory", "background", "whyAI", "nonTechInterests"]) ||
      typeof personal.includePhoto !== "boolean" ||
      !isList(value.skills, isSkill) || !isList(value.projects, isProject) ||
      !isList(value.experience, isExperience) || !isList(value.achievements, isString) ||
      !isString(value.resumeLink)) {
    return null;
  }

  const journey = personal.journey === undefined ? legacyJourney : personal.journey;
  if (!isList(journey, isJourneyStop)) return null;
  return { ...value, personal: { ...personal, journey } } as unknown as Content;
}
