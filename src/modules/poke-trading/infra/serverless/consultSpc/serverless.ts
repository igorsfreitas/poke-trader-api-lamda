import { BaseSls } from '../../../../../core/infra/BaseSls'

class ConsultSpcSls extends BaseSls {

  constructor() {
    super()

    this.setHandler(__dirname, 'handler.default')

    this.setMemorySize(256)

    this.setTimeout(30)

    this.keepWarm()

    this.setName('consult-spc')

    this.addHttpEvent({
      method: 'get',
      path: '3rd-inquiries/spc/{cpf}',
      authorizer: 'COGNITO',
    })

    this.addIamRoleStatement({
      Effect: 'Allow',
      Action: [
        'secretsmanager:GetSecretValue',
      ],
      Resource: [
        'arn:aws:secretsmanager:#{AWS::Region}:#{AWS::AccountId}:secret:${self:provider.stage}/3rd/mongodb*'
      ],
    })
  }

  public compile() {
    return this
  }

}

export default new ConsultSpcSls().compile()
