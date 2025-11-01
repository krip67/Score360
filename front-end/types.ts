// Fix: Removed self-import of 'GoalSubtask' which was causing a name conflict with the interface declared in this file.
export type TaskPriority = 'HIGHEST' | 'HIGH' | 'LOW' | 'LOWEST';

export interface Goal {
  id: number;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  categoryName: string;
  metricName: string | null;
  metricValue: string | null;
  priority: TaskPriority;
  parentTaskId: number | null;
  subtaskIds: number[];
}

export interface NewGoalPayload {
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  category_id: number;
  metricId: number;
  metricValue: string;
  taskPriorityEnum: TaskPriority;
  parentId?: number;
}

export interface GoalSubtask {
    id: number;
    name: string;
    description: string;
    dateStart: string;
    dateEnd: string;
}

export interface GoalDetail extends Goal {
    subtasks: GoalSubtask[];
}

export interface NewReviewPayload {
    goalId: number;
    reviewerIds: number[];
}

export interface Category {
    id: number;
    name: string;
}

export interface Metric {
    id: number;
    description: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    post?: string;
}

export interface AuthenticatedUser extends User {
    department: string;
    team: string;
}

export interface ReviewGoal {
    id: number; // This is review ID
    taskName: string;
    taskDescription: string;
}

export interface NewPeerReviewPayload {
    resultScore: number;
    comment: string;
    interactionScore: number;
    recommendation: string;
}

export interface NewSelfAssessmentPayload {
    taskId: number;
    result: string;
    personalContribution: string;
    experience: string;
    future: string;
    interactionScore: number;
    satisfaction: number;
    reviewerIds: number[];
}

export interface SelfAssessment {
    result: string;
    personalContribution: string;
    experience: string;
    future: string;
    interactionScore: number;
    satisfaction: number;
}

export interface PeerReviewAssessment {
    resultScore: number;
    interactionScore: number;
    comment: string;
    recommendation: string;
}

export interface BossAssessment {
    resultScore: number;
    comment: string;
    contribution: string;
    interactionScore: number;
    recommendation: string;
    totalScore: number;
}

export interface EmployeeReview {
    id: number;
    taskId: number | null;
    taskName: string;
    taskDescription: string;
    selfAssessment: SelfAssessment;
    respAssessments: PeerReviewAssessment[];
    bossAssessment: BossAssessment | null;
}

export interface NewBossAssessmentPayload extends BossAssessment {}

export interface HistoricalScore {
    createTime: string;
    recommendation: string;
    effectiveness: number;
    potential: number;
    rating: number;
    selectedCourses?: number[];
}

export interface SubordinateHistoricalScore {
    potentialScoreId: number;
    createTime: string;
    effectiveness: number;
    potential: number;
    rating: number;
    recommendation: string;
    selectedCourses?: number[];
}

export enum ProfessionalQuality {
    RESPONSIBILITY = 'RESPONSIBILITY',
    RESULT_ORIENTED = 'RESULT_ORIENTED',
    PROACTIVE = 'PROACTIVE',
    OPEN_MINDED = 'OPEN_MINDED',
    TEAM_PLAYER = 'TEAM_PLAYER',
}

export enum PersonalQuality {
    TAKES_RESPONSIBILITY = 'TAKES_RESPONSIBILITY',
    TRANSPARENT_COMMUNICATION = 'TRANSPARENT_COMMUNICATION',
    SHARES_INFORMATION = 'SHARES_INFORMATION',
    ORGANIZES_WORK = 'ORGANIZES_WORK',
}

export enum DevelopmentDesire {
    PROACTIVE = 'PROACTIVE',
    NEEDS_HELP = 'NEEDS_HELP',
    UNSURE = 'UNSURE',
    NONE = 'NONE',
}

export enum ReadinessTimeframe {
    ONE_TO_TWO_YEARS = 'ONE_TO_TWO_YEARS',
    THREE_YEARS = 'THREE_YEARS',
    MORE_THAN_THREE_YEARS = 'MORE_THAN_THREE_YEARS',
}

export interface AggregateScorePayload {
    hardSkill: string;
    softSkill: string;
    isMotivation: boolean;
    promotionEnum: string;
    isSuccessor: boolean;
    readiness: string | null;
    leavingRisk: number;
}

export interface Course {
    id: number;
    name: string;
    description: string;
    type: string;
    url: string;
}

export interface AggregatedScore {
    effectiveness: number;
    potential: number;
    rating: number;
    recommendation: string;
    potentialScoreId: number;
    selectedCourses: number[];
}

export interface FinalizeScorePayload extends AggregatedScore {
    hardSkill: string;
    softSkill: string;
    isMotivation: boolean;
    promotionEnum: string;
    isSuccessor: boolean;
    readiness: string | null;
    leavingRisk: number;
}

export interface TrainingMaterial {
  id: number;
  name: string;
  type: string;
  description: string;
  url: string;
}
