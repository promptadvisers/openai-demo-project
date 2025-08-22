// Role-based permission system for unified workflow

export const USER_ROLES = {
  BA: 'BA', // Brand Analyst - Internal User
  CLIENT: 'Client' // Pharmaceutical Client
};

// Permission matrix for each workflow step
export const STEP_PERMISSIONS = {
  1: {
    [USER_ROLES.BA]: { canView: true, canEdit: true, canApprove: false },
    [USER_ROLES.CLIENT]: { canView: true, canEdit: false, canApprove: false }
  },
  2: {
    [USER_ROLES.BA]: { canView: true, canEdit: true, canApprove: false, canRequestApproval: true },
    [USER_ROLES.CLIENT]: { canView: true, canEdit: false, canApprove: true }
  },
  3: {
    [USER_ROLES.BA]: { canView: true, canEdit: true, canApprove: false },
    [USER_ROLES.CLIENT]: { canView: false, canEdit: false, canApprove: false }
  },
  4: {
    [USER_ROLES.BA]: { canView: true, canEdit: true, canApprove: false },
    [USER_ROLES.CLIENT]: { canView: false, canEdit: false, canApprove: false }
  },
  5: {
    [USER_ROLES.BA]: { canView: true, canEdit: true, canApprove: false, canRequestApproval: true },
    [USER_ROLES.CLIENT]: { canView: true, canEdit: false, canApprove: true }
  },
  6: {
    [USER_ROLES.BA]: { canView: true, canEdit: true, canApprove: false },
    [USER_ROLES.CLIENT]: { canView: false, canEdit: false, canApprove: false }
  },
  7: {
    [USER_ROLES.BA]: { canView: true, canEdit: true, canApprove: false },
    [USER_ROLES.CLIENT]: { canView: true, canEdit: false, canApprove: false }
  }
};

// Check if a user has permission for a specific action on a step
export const hasPermission = (userRole, step, action) => {
  const stepPermissions = STEP_PERMISSIONS[step];
  if (!stepPermissions) return false;
  
  const rolePermissions = stepPermissions[userRole];
  if (!rolePermissions) return false;
  
  return rolePermissions[action] === true;
};

// Get all permitted steps for a user role
export const getPermittedSteps = (userRole) => {
  return Object.keys(STEP_PERMISSIONS)
    .filter(step => hasPermission(userRole, step, 'canView'))
    .map(Number);
};

// Check if step requires client approval
export const requiresClientApproval = (step) => {
  return step === 2 || step === 5;
};

// Check if user can proceed to next step
export const canProceedToNextStep = (userRole, currentStep, approvalStates) => {
  // BA can't proceed past approval gates without approval
  if (userRole === USER_ROLES.BA) {
    if (currentStep === 2 && approvalStates.step2.status !== 'approved') {
      return false;
    }
    if (currentStep === 5 && approvalStates.step5.status !== 'approved') {
      return false;
    }
  }
  
  // Clients can't navigate beyond their permitted steps
  if (userRole === USER_ROLES.CLIENT) {
    const nextStep = currentStep + 1;
    return hasPermission(userRole, nextStep, 'canView');
  }
  
  return true;
};

// Generate mock approval request notification
export const generateApprovalRequest = (step, projectData) => {
  const stepName = step === 2 ? 'Brand Strategy Summary' : 'Simulation Results';
  return {
    id: Date.now(),
    type: 'approval_request',
    step,
    title: `Approval Required: ${stepName}`,
    message: `Please review and approve the ${stepName} for ${projectData?.summary?.projectName || 'the project'}`,
    timestamp: new Date().toISOString(),
    status: 'pending',
    requestedBy: 'Brand Analyst',
    projectId: projectData?.id
  };
};