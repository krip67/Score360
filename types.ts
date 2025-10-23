export interface Subgoal {
  id: number;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  categoryName: string | null;
  metricName?: string | null;
  priority?: TaskPriority | null;
}

export interface Goal {
  id: number;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  categoryName: string;
  metricName: string | null;
  priority: TaskPriority | null;
  subtaskIds: number[];
  parentTaskId: number | null;
}

export interface GoalDetail extends Goal {
  subtasks: Subgoal[];
}

export type TaskPriority = 'HIGHEST' | 'HIGH' | 'LOW' | 'LOWEST';

export interface Metric {
  id: number;
  description: string;
}

export interface NewGoalPayload {
  name:string;
  description: string;
  dateStart: string;
  dateEnd: string;
  category_id: number;
  metricId: number;
  taskPriorityEnum: TaskPriority;
  parentId?: number;
}

// This is used internally by the GoalModal
export interface Category {
  id: number;
  name: string;
}

// This is used for the ReviewModal
export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  tabNum: number;
}

export interface NewReviewPayload {
  goalId: number;
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
  comment: string;
  interactionScore: number;
  recommendation: string;
}

// This is the new structure for an item in the list fetched for "Оценка коллег"
export interface ReviewGoal {
  id: number; // reviewId
  taskId: number;
  taskName: string;
  taskDescription: string;
  selfAssessment?: SelfAssessment | null;
  respAssessments?: PeerReviewAssessment[];
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

export interface ManagerAssessment {
  resultScore: number;
  strengthsComment: string;
  contributionComment: string;
  interactionScore: number;
  recommendations: string;
  overallRating: number;
}

export type NewManagerAssessmentPayload = ManagerAssessment;


export interface EmployeeReview {
  id: number;
  taskId: number | null;
  taskName: string | null;
  taskDescription: string | null;
  selfAssessment: SelfAssessment;
  respAssessments: PeerReviewAssessment[];
  managerAssessment?: ManagerAssessment | null;
}