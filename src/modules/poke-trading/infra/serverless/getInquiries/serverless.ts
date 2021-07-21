import { BaseSls } from '../../../../../core/infra/BaseSls'

class GetInquiries extends BaseSls {

  constructor() {
    super()

    this.setHandler(__dirname, 'handler.default')

    this.setName('get-inquiries')

    this.addHttpEvent({
      method: 'get',
      path: '3rd-inquiries/{cpf}',
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

export default new GetInquiries().compile()
