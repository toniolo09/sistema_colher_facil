import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import { ApiError } from '@/api/client';
import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { GroupCard } from '@/components/GroupCard';
import { IconButton } from '@/components/IconButton';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { useCadastro } from '@/features/auth/api';
import { colors } from '@/theme';

// Regras do UserController::store.
const schema = z.object({
  nome: z.string().trim().min(1, 'Informe seu nome completo').max(255),
  telefone: z.string().trim().min(1, 'Informe seu telefone ou WhatsApp').max(20),
  email: z.email({ error: 'Informe um e-mail válido' }).max(255),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
  nome_propriedade: z.string().trim().max(255),
});

type FormValues = z.infer<typeof schema>;

const firstStepFields = ['nome', 'telefone', 'email', 'password'] as const;

export default function Cadastro() {
  const router = useRouter();
  const cadastro = useCadastro();
  const [step, setStep] = useState<1 | 2>(1);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, trigger, setError, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: '',
      telefone: '',
      email: '',
      password: '',
      nome_propriedade: '',
    },
  });
  const { errors } = formState;

  async function goToSecondStep() {
    if (await trigger(firstStepFields)) setStep(2);
  }

  const submit = handleSubmit((values) => {
    setSubmitError(null);
    cadastro.mutate(
      {
        nome: values.nome,
        telefone: values.telefone,
        email: values.email,
        password: values.password,
        tipo_usuario: 'produtor',
        nome_propriedade: values.nome_propriedade || undefined,
      },
      {
        onError: (error) => {
          if (error instanceof ApiError && error.fieldErrors.email) {
            setStep(1);
            setError('email', { message: 'Já existe uma conta com esse e-mail' });
            return;
          }
          setSubmitError('Não conseguimos criar sua conta agora. Tente de novo.');
        },
      },
    );
  });

  return (
    <Screen
      footer={
        step === 1 ? (
          <Button label="Continuar" onPress={goToSecondStep} />
        ) : (
          <Button label="Criar minha conta" onPress={submit} loading={cadastro.isPending} />
        )
      }
    >
      <View style={styles.header}>
        <IconButton
          icon={ArrowLeft}
          accessibilityLabel="Voltar"
          onPress={() => (step === 2 ? setStep(1) : router.back())}
        />
        <Text variant="secondary" style={styles.stepCount}>
          {step} de 2
        </Text>
      </View>
      <View style={styles.progress} accessibilityLabel={`Passo ${step} de 2`}>
        <View style={[styles.progressPart, styles.progressDone]} />
        <View style={[styles.progressPart, step === 2 && styles.progressDone]} />
      </View>

      {step === 1 ? (
        <>
          <Text variant="title" style={styles.title} accessibilityRole="header">
            Seus dados
          </Text>
          <Text variant="secondary" style={styles.subtitle}>
            É assim que os clientes vão falar com você.
          </Text>
          <View style={styles.form}>
            <GroupCard>
              <Controller
                control={control}
                name="nome"
                render={({ field }) => (
                  <Field
                    label="Nome completo"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.nome?.message}
                    autoComplete="name"
                    textContentType="name"
                    maxLength={255}
                  />
                )}
              />
              <Controller
                control={control}
                name="telefone"
                render={({ field }) => (
                  <Field
                    label="Telefone ou WhatsApp"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.telefone?.message}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    textContentType="telephoneNumber"
                    maxLength={20}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Field
                    label="E-mail"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="username"
                    maxLength={255}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Field
                    label="Senha"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.password?.message}
                    secureTextEntry
                    autoComplete="new-password"
                    textContentType="newPassword"
                  />
                )}
              />
            </GroupCard>
          </View>
        </>
      ) : (
        <>
          <Text variant="title" style={styles.title} accessibilityRole="header">
            Sua propriedade
          </Text>
          <Text variant="secondary" style={styles.subtitle}>
            Conte o nome do seu sítio, chácara ou fazenda.
          </Text>
          <View style={styles.form}>
            <GroupCard>
              <Controller
                control={control}
                name="nome_propriedade"
                render={({ field }) => (
                  <Field
                    label="Nome da propriedade"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.nome_propriedade?.message}
                    maxLength={255}
                  />
                )}
              />
            </GroupCard>

            {submitError && (
              <Text variant="secondary" style={styles.error} accessibilityLiveRegion="polite">
                {submitError}
              </Text>
            )}
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  stepCount: { color: colors.ink3 },
  progress: { flexDirection: 'row', gap: 6, marginTop: 20 },
  progressPart: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.line },
  progressDone: { backgroundColor: colors.forest },
  title: { marginTop: 32 },
  subtitle: { marginTop: 6, fontSize: 17 },
  form: { marginTop: 28, gap: 24 },
  error: { color: colors.clay },
});
