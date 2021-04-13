import { DynamicModulesMap } from '../tokens/dynamic-modules.token';

export const ModuleRegistry: DynamicModulesMap = {
  default: () => import('../components/default/default.module'),
  button: () => import('../components/button/button.module'),
  select: () => import('../components/select/select.module'),
  form: () => import('../components/form/form.module'),
  formGroup: () => import('../components/form-group/form-group.module'),
};
