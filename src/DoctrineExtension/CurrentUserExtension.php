<?php


namespace App\DoctrineExtension;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Module;
use App\Entity\Question;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface{

    private $security;
    private $auth;

    public function __Construct(Security $security, AuthorizationCheckerInterface $checker){
        $this->security = $security;
        $this->auth = $checker;
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass){
        // get current user
        $user = $this->security->getUser();
        //get data linked to current user
        if(($resourceClass === Question::class || $resourceClass === Module::class) && !$this->auth->isGranted('ROLE_ADMIN') /*&& $user instanceof User*/){

            $rootAlias = $queryBuilder->getRootAliases()[0];

            if($resourceClass === Question::class){
                $queryBuilder->andWhere("$rootAlias.user = :user");

            }else if($resourceClass === Module::class){
                $queryBuilder->andWhere("$rootAlias.user = :user");
            }

            $queryBuilder->setParameter("user", $user);

        }
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);

    }


    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}