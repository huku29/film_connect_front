import { Typography, Box, List, ListItem } from '@mui/material'
import { BaseLayout } from '../layouts'
import { useTranslation } from 'react-i18next'

export const UseTermsEnglish = () => {
  const { t } = useTranslation()

  return (
    <BaseLayout>
      <Typography variant="h4" sx={{ mt: 12, textAlign: 'center', mb: 5,fontWeight: 'bold'}}>
        Terms of Use
      </Typography>
      <Box sx={{ ml: 5, mt: 5, mb: 8 }}>
        <Typography sx={{ mb: 5 }}>
          These Terms of Use (hereinafter referred to as the “Terms”) set forth
          the terms of use of the Services (which include this website and do
          not specifically distinguish the Services and this website in the
          following terms and conditions). The Terms apply to all users of the
          Services (the “User(s)”).
        </Typography>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Consent to the Terms
          </Typography>
          <Typography>
            By using the Services, the Users are deemed to have validly and
            irrevocably consented to the Terms. Any User who does not consent to
            the Terms may not use the Services.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Registration for Use
          </Typography>
          <Typography>
            If the User wish to use the Services, the User may register for use
            of the Services by agreeing to the Terms and applying for such
            registration in the manner prescribed by the Site and upon the Site
            approving such application.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Refusal of Registration
          </Typography>
          <Typography>
            The Site may refuse to approve application of registration for use
            if it considers that the application falls under any of the
            following. The Site will not be obliged to disclose any information
            pertaining to reasons for refusal of registration.
          </Typography>
          <List>
            <ListItem>・if applicants have reported false matters</ListItem>
            <ListItem>
              ・if application has been made by a person who has violated the
              Terms
            </ListItem>
            <ListItem>
              ・if Company considers that the registration for use is
              inappropriate
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Use by Minors
          </Typography>
          <Typography>
            If the User is a minor, the User must obtain a consent from his/her
            statutory agent prior to using the Services. Please be sure to
            obtain a consent from your statutory agent prior to using the
            smartphones and other devices necessary to use the Services. If the
            User has commenced use of the Services without a consent from
            his/her statutory agent and thereafter reaches age of majority, the
            User shall be deemed to have ratified its use of the Services while
            the User is a minor.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Management of Login Information
          </Typography>
          <Typography>
            The User shall, at its own responsibility, appropriately manage the
            login information of the Services. In no event may the User assign,
            lend, or share the login information with any third party. The Site
            shall not be liable for any damages as a result of use of login
            information by a third party, unless such damages are due to willful
            misconduct or gross negligence of the Site.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Use of Content
          </Typography>
          <Typography>
            The Site hereby grants to the User a license to use privately,
            within the scope of use of the Services, the text, image, video,
            sound, music, software, program, code or other content provided by
            the Services. In terms of the paid content, private use within the
            scope of use of the Services shall be licensed when the usage fees
            as prescribed by the Site has been paid. These licenses are
            non-exclusive, non-transferable nor non-sublicensable licenses. Any
            use of the content provided by the Services beyond the scope of the
            Services is prohibited. The User agrees in advance that if the User
            loses the right to use the Services for any reason whatsoever, any
            and all contents of the Services may no longer be available.In using
            the Services, the User acknowledges that Twitter username will be
            known to other users.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Default Charges
          </Typography>
          <Typography>
            If the User fails to pay any pecuniary obligation owed to the Site
            on the due date therefor, the User shall pay to the Site a default
            charge at the rate of 14.6% per annum.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Posts by the User
          </Typography>
          <Typography>
            The User represents and warrants to the Site that the User has
            lawful right to transmit the information contained in the User's
            posts and that the User's posts do not infringe any intellectual
            property right (copyright, patent right, utility model right,
            trademark right, design right (including the right to obtain such
            rights or apply for registration of such rights), idea, know-how,
            etc., and the same shall apply hereinafter), ownership, or any other
            right of any third party. The User retains the copyright on his/her
            posts. The Site does not acquire any copyright in the User’s post;
            however, the Site may reproduce, adapt, automatically transmit to
            the public, and make available for transmission as necessary for
            automatic transmission, the User's posts, free of charge, for an
            indefinite period of time and without limitation of any region, to
            the extent necessary to provide, maintain, improve or promote the
            Services. In such case, the Users shall not exercise the moral
            rights of authors against the Site and those who have succeeded the
            rights from or have been granted permission from the Site. The User
            are responsible for back-up of the User’s posts. The Site shall have
            no obligation to back up any of the User’s posts. The Users must not
            post the following information:
          </Typography>
          <List>
            <ListItem>
              ・information that infringes any intellectual property right,
              portrait right, privacy, reputation, or other right or interest of
              the Company or a third party
            </ListItem>
            <ListItem>
              ・information that contains personal information, etc. that can
              identify the User (provided, however, that this shall not apply if
              requested by the Site such as when necessary for the registration
              for use or if otherwise approved by the Site)
            </ListItem>
            <ListItem>・information that contains obscene expressions</ListItem>
            <ListItem>
              ・information for purpose of encountering with a third party who
              has not known him/her or committing an obscene act, etc. with such
              third party, regardless of whether such third party is of the
              opposite sex or of the same sex
            </ListItem>
            <ListItem>
              ・information that contains any expression that induces, solicits
              for or encourages suicide or self-injurious behavior
            </ListItem>
            <ListItem>
              ・information regarding sales and purchase of drugs or dangerous
              drugs, or information that contains expressions that promote
              improper use of drugs or dangerous drugs
            </ListItem>
            <ListItem>
              ・information relating to the promotion or advertising of
              religious acts, religious groups, political activities or
              political organizations
            </ListItem>
            <ListItem>
              ・information that solicits the Users for network business
            </ListItem>
            <ListItem>
              ・information that contains the texts equivalent to junk mail or
              spam mail
            </ListItem>
            <ListItem>
              ・information that may have an adverse effect on minors
            </ListItem>
            <ListItem>
              ・brutal expressions and other information that may cause
              discomfort to others.
            </ListItem>
            <ListItem>
              ・information that contains malicious programs such as computer
              viruses
            </ListItem>
            <ListItem>
              ・any other information that the Site deems inappropriate
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Prohibited Matters
          </Typography>
          <Typography>When using the Services, the User shall not:</Typography>
          <List>
            <ListItem>
              ・violate or facilitate violation of any law or regulation, any
              judgment or decision or order of any court, or any administrative
              measure which has legal binding force under law or regulation
            </ListItem>
            <ListItem>・perform any act relating to criminal act</ListItem>
            <ListItem>
              ・infringe any intellectual property right of the Site or a third
              party
            </ListItem>
            <ListItem>
              ・infringe any portrait right, privacy, reputation, or any other
              right or interest of the Site or a third party
            </ListItem>
            <ListItem>
              ・excessively apply a load on the servers or network of the
              Company or a third party or interfere with the normal functions
              thereof
            </ListItem>
            <ListItem>
              ・potentially interfere with the operation of the Services
            </ListItem>
            <ListItem>・make or attempt any unauthorized access</ListItem>
            <ListItem>
              ・disassemble, decompile, reverse-engineer or otherwise analyze
              the source code of the Services
            </ListItem>
            <ListItem>
              ・illegally access the system connected to the Service without any
              authorization or illegally rewrite or delete any information
              stored in the Company’s facilities
            </ListItem>
            <ListItem>
              ・reproduce, transmit, transfer, lease or alter any website or
              software of the Services
            </ListItem>
            <ListItem>
              ・lend, transfer, sell or otherwise dispose of, with charge, any
              account or content on the Services to any third party
            </ListItem>
            <ListItem>
              ・make commercial use of information acquired through the Services
            </ListItem>
            <ListItem>
              ・make any profit in relation to the Services in a manner not
              intended by the Company
            </ListItem>
            <ListItem>
              ・promote, advertise, solicit or conduct business on the Services
              in a manner not authorized by the Company
            </ListItem>
            <ListItem>
              ・collect or accumulate personal information of other Users
            </ListItem>
            <ListItem>
              ・use the Services with illegal, fraudulent or unjust purposes
            </ListItem>
            <ListItem>
              ・cause disadvantage, damage or discomfort to other Users of the
              Services or other third parties
            </ListItem>
            <ListItem>・impersonate another User</ListItem>
            <ListItem>・use another User's account</ListItem>
            <ListItem>・intend to meet strangers of the opposite sex</ListItem>
            <ListItem>
              ・give benefits, directly or indirectly, to an Anti-social Force
            </ListItem>
            <ListItem>・violate public policy</ListItem>
            <ListItem>
              ・use the Services while walking, driving or in any other
              situation or manner in which use of the Services is inappropriate
            </ListItem>
            <ListItem>
              ・conduct any other acts which the Company deems inappropriate
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Prohibition of Exchange for Cash
          </Typography>
          <Typography>
            The Users are prohibited from, by whatever means, conducting any of
            the following transactions with respect to any content or Virtual
            Currency acquired through the Services:
          </Typography>
          <List>
            <ListItem>・sales and Purchase</ListItem>
            <ListItem>
              ・any assignment, transfer, lending, borrowing, etc. along with
              exchange of money or other consideration
            </ListItem>
            <ListItem>
              ・any other act which the Company determines falls under the
              category of exchange for cash
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Exclusion of Anti-Social Forces
          </Typography>
          <Typography>
            The User represents and warrants that he/she does not, and will not
            in the future, fall under any of the following:
          </Typography>
          <List>
            <ListItem>
              ・the User (including its own officers in the case where the User
              is a corporation or any other type of organization.) is an
              organized crime group, a member of an organized crime group, a
              person for whom five (5) years have not yet passed from the time
              when such person ceased to be a member of an organized crime
              group, a quasi-member of an organized crime group, a company
              related to an organized crime group, a corporate racketeer, a
              group engaging in criminal activities under the pretext of
              conducting social campaigns, a crime group specialized in
              intellectual crimes, or any other person equivalent thereto
              (hereinafter collectively referred to as "Organized Crime Group
              Member, etc.")
            </ListItem>
            <ListItem>
              ・if the User is a corporation or any other type of organization,
              the User has any relationship in which an Organized Crime Group
              Member, etc. is deemed to have a control over the management of
              the User
            </ListItem>
            <ListItem>
              ・if the User is a corporation or any other type of organization,
              the User has any relationship in which an Organized Crime Group
              Member, etc. is deemed to be substantially involved in the
              management of the User
            </ListItem>
            <ListItem>
              ・the User has relationship in which the User is deemed to make
              use of an Organized Crime Group Member, etc., such as engaging in
              transactions for the purpose of wrongful interests of the User or
              a third party or causing damage to a third party
            </ListItem>
            <ListItem>
              ・the User has relationship in which the User is deemed to provide
              the funds, etc. or give benefits to an Organized Crime Group
              Member, etc
            </ListItem>
            <ListItem>
              ・if the User is a corporation or any other type of organization,
              any of its officers or persons who are substantially involved in
              its management have relationship with an Organized Crime Group
              Member, etc. which should be socially criticized
            </ListItem>
          </List>
          <Typography>
            The User warrants that it will not conduct or cause a third party to
            conduct any of the following acts:
          </Typography>
          <List>
            <ListItem>・act of a violent demand</ListItem>
            <ListItem>
              ・act of an unreasonable demand beyond legal responsibility
            </ListItem>
            <ListItem>
              ・use of intimidation or violence in relation to transactions
            </ListItem>
            <ListItem>
              ・act that damages the Site's credits or that obstructs the Site's
              business by spreading false rumors or by the use of fraudulent
              means or force
            </ListItem>
            <ListItem>
              ・any other act equivalent to any of the preceding
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Restrictions on Use of the Services
          </Typography>
          <Typography>
            The Site may, without prior notice, restrict the User's use of any
            or all of the Services or cancel the registration of the User if the
            User falls under any of the following. The Company shall not be
            liable for any damages incurred by the User as a result of an act
            performed by the Company in accordance with this Article.
          </Typography>
          <List>
            <ListItem>
              ・if the User breaches any provision of the Terms
            </ListItem>
            <ListItem>
              ・if it is found that there is a false fact in the registered
              matters
            </ListItem>
            <ListItem>
              ・if the User fails to perform any pecuniary obligation
            </ListItem>
            <ListItem>
              ・if there is no response from the User to a contact from the
              Company after a reasonable period of time
            </ListItem>
            <ListItem>
              ・if the Services is not used for a reasonable period of time from
              the last date of use
            </ListItem>
            <ListItem>
              ・if the Company considers that the User is the Anti-social
              Forces, etc. or has some kind of interaction or involvement with
              the Anti-social Forces, etc.
            </ListItem>
            <ListItem>
              ・in addition, if the Company considers that the User’s use of the
              Services is inappropriate
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Cessation of the Provision of the Services
          </Typography>
          <Typography>
            The Site may suspend or discontinue the provision of all or part of
            the Services without prior notice to the User if it considers that
            any of the following items exists. The Site shall not be liable for
            any disadvantages or damages incurred by the User or a third party
            in such case.
          </Typography>
          <List>
            <ListItem>
              ・if maintenance, inspection or renewal of a computer system
              relating to the Services is to be conducted
            </ListItem>
            <ListItem>
              ・if it becomes difficult to provide the Services due to force
              majeure events such as earthquake, lightning strike, fire, power
              outage, natural disaster or spread of viruses
            </ListItem>
            <ListItem>
              ・if a computer or communication line, etc. is shut down due to an
              accident
            </ListItem>
            <ListItem>
              ・in addition, if the Company considers that it is difficult to
              provide the Services
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            DISCLAIMER OF WARRANTY
          </Typography>
          <Typography>
            THE SITE DOES NOT WARRANT THAT THE SERVICES OR THE CONTENTS PROVIDED
            BY THE SERVICES ARE FREE FROM SYSTEM BUGS OR INFRINGEMENTS OF
            THIRD-PARTY RIGHTS. NOR DOES IT GUARANTEE SAFETY, RELIABILITY,
            ACCURACY, COMPLETENESS, VALIDITY OR FITNESS FOR A PARTICULAR PURPOSE
            OF THE SERVICES.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Disclaimer
          </Typography>
          <Typography>
            THE SITE SHALL NOT BE RESPONSIBLE OR LIABLE FOR ANY DAMAGES INCURRED
            BY THE USERS IN CONNECTION WITH THE SERVICES; provided, however,
            that this disclaimer will not apply if the agreement between the
            Company and the User regarding the Services (including the Terms)
            constitutes a consumer contract under Consumer Contract Act. Even if
            the agreement between the Company and the User constitutes a
            consumer contract, the Company shall not be liable for any damage
            arising out of special circumstances (including the cases where the
            Company or the User have foreseen or could foresee the occurrence of
            such damage) incurred by the Users due to the Company's negligence
            (excluding gross negligence). The Company assumes no responsibility
            for any trouble that may arise between the User and any other User
            or a third party. The Company shall not be liable for any damages
            incurred by the User in connection with the Services in excess of
            usage fees paid by such User to the Company during the month in
            which such damages occur. The Site uses the TMDB API and Twitter
            API.The Site uses the TMDB API but is not endorsed or certified by
            TMDB. In the event of a failure due to a malfunction, delay, fault,
            change in specifications, change in terms, change in usage rights or
            permission conditions, etc. in the services, programmes, delivery
            servers or APIs of each SNS with which the Service is governed,
            making it difficult to use the Service properly, the Site shall
            respond in good faith to normalise the use of the Service, but shall
            not be liable for any damage caused by these causes.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Change of the Description of the Services
          </Typography>
          <Typography>
            The Site may change the description of the Services or discontinue
            or terminate the provision of the Services without notice to the
            User. The Users shall agree in advance without objection that if the
            Services are terminated, the Users shall lose any and all rights to
            use the paid contents and may not utilize such paid contents
            thereafter. The Company shall not be liable for any damage incurred
            by the User as a result thereof.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Amendments to the Terms
          </Typography>
          <Typography>
            The Company may amend the Terms at any time without notice to the
            User. The amended Terms shall become effective at the time of being
            posted on the Company’s website. Any User who continues to use the
            Services after amendments to the Terms shall be deemed to have
            consented to the amended Terms.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Handling of Personal Information
          </Typography>
          <Typography>
            Personal information of the User acquired through use of the
            Services shall be handled appropriately in accordance with the
            Site's Privacy Policy.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Notice or Contact
          </Typography>
          <Typography>
            Any notice or contact between the User and the Site shall be made in
            the manner prescribed by the Site. Unless the User submits
            notification of change in accordance with the method separately
            prescribed by the Company, the Company may consider the contact
            address currently registered to be valid and give notice to or
            contact such contact address. Such notice or contact shall be deemed
            to have arrived at the User at the time of transmission.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Assignment of Rights and Obligations
          </Typography>
          <Typography>
            The User may not assign to or give as a security any third party the
            User’s status under the service agreement or the rights or
            obligations under the Terms, without prior written consent of the
            Site.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Assignment of Business
          </Typography>
          <Typography>
            If the Site assigns its business pertaining to the Services to
            another company (including assignment of business, company split or
            any other cases where the Company’s business will be transferred),
            it may assign, along with such assignment of business, its status
            under the service agreement, the rights and obligations under the
            Terms and the User's information to the assignee of such assignment
            of business. The Users shall be deemed to have consented to such
            assignment in advance.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Applicability
          </Typography>
          <Typography>
            The Terms apply to all relationships between the Users and the
            Company in relation to use of the Services. The Company may set
            forth rules for use of the Services in addition to the Terms. These
            rules, regardless of their names, form part of the Terms. In the
            event that the Terms are inconsistent with any of such rules, such
            rules shall prevail.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Severability
          </Typography>
          <Typography>
            If any provision of the Terms or any part thereof is held to be
            invalid or unenforceable, such holding shall in no way affect the
            other parts of the Terms and the remaining provisions of the Terms
            shall remain valid and enforceable.
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Governing Law and Jurisdiction
          </Typography>
          <Typography>
            The Terms shall be construed in accordance with and governed by the
            laws of Japan. Any dispute arising in connection with the Services
            shall be subject to the exclusive jurisdiction of the district court
            having jurisdiction over the location of the Otsu city.
          </Typography>
        </Box>
        <Typography variant="subtitle1"></Typography>Prescribed on 01, 15, 2023
      </Box>
    </BaseLayout>
  )
}
