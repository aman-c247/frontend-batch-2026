import { z } from 'zod'

export const activityFormSchema = z
  .object({
    activityType: z.string().min(1, 'Required'),
    carrier: z.string().optional(),
    subType: z.string().optional(),
    activityName: z.string().min(1, 'Required'),
    addToDataSet: z.boolean(),
    activityDetails: z.string().optional(),
    dueDate: z.string().min(1, 'Required'),
    priority: z.string().min(1, 'Required'),
    followUpDate: z.string().optional(),
    activityStatus: z.string().min(1, 'Required'),
    initialCommunication: z.string().optional(),
    delegatedActivity: z.enum(['yes', 'no']),
    assignToProject: z.enum(['yes', 'no']),
    recurringActivity: z.enum(['yes', 'no']),
    personalActivity: z.enum(['yes', 'no']),
    organization: z.string().optional(),
    department: z.string().optional(),
    position: z.string().optional(),
    person: z.string().optional(),
    project: z.string().optional(),
    frequency: z.string().optional(),
    note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.activityType === 'Account' && !data.carrier) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['carrier'],
      })
    }
    if (data.delegatedActivity === 'yes') {
      if (!data.organization) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['organization'],
        })
      }
      if (!data.department) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['department'],
        })
      }
    }
    if (data.assignToProject === 'yes' && !data.project) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['project'],
      })
    }
    if (data.recurringActivity === 'yes' && !data.frequency) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['frequency'],
      })
    }
  })

export type ActivityFormValues = z.infer<typeof activityFormSchema>
