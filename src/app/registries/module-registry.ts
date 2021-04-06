import { DynamicModulesMap } from '../tokens/dynamic-modules.token';

export const ModuleRegistry: DynamicModulesMap = {
  default: () =>
    import('../components/default/default.module').then((m) => m.DefaultModule),
  button: () =>
    import('../components/button/button.module').then((m) => m.ButtonModule),
  select: () =>
    import('../components/select/select.module').then((m) => m.SelectModule),
  form: () =>
    import('../components/form/form.module').then((m) => m.DynamicFormModule),
  formGroup: () =>
    import('../components/form-group/form-group.module').then(
      (m) => m.FormGroupModule
    ),
};
